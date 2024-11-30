import { message, Modal } from "antd";
import StoreGallery from "./StoreGallery"
import {getItemsInStore, buyItem} from "../../services/Store"
import { useEffect, useState } from "react";

const StoreItem: React.FC = () => {
    const [items, setItems] = useState<
      { name: string; description: string }[]
    >([]);
  
    // Fonction pour récupérer les données au montage du composant
    useEffect(() => {
      const fetchItems= async () => {
        const data = await getItemsInStore();
        setItems(data);
      };
      fetchItems();
    }, []);
  
    // Gestion de l'achat
    const handleBuy = (item: { name: string; description: string }) => {
      Modal.confirm({
        title: `Acheter ${item.name}`,
        content: `Voulez-vous vraiment acheter ${item.name} ?`,
        onOk: () => {
          message.success(`Vous avez acheté ${item.name} !`);
          buyItem(item.name);
        },
        onCancel: () => {
          message.info("Achat annulé.");
        },
      });
    };
  
    const backgroundstyle = {
      background: "grey",
      padding: "10px",
      borderRadius: "5px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    };
  
    return (
      <div style={backgroundstyle}>
        <StoreGallery items={items} columns={2} onBuy={handleBuy} />
      </div>
    );
  };
  
  export default StoreItem;