import { message, Modal } from "antd";
import StoreGallery from "./StoreGallery"
import {getPechakuchonInStore, buyPokechakuchon} from "../../services/Store"
import { useEffect, useState } from "react";

const StorePokechakuchon: React.FC = () => {
    const [pokechakuchon, setPokechakuchon] = useState<
      { name: string; description: string }[]
    >([]);
  
    // Fonction pour récupérer les données au montage du composant
    useEffect(() => {
      const fetchPokechakuchon = async () => {
        const data = await getPechakuchonInStore();
        setPokechakuchon(data);
      };
      fetchPokechakuchon();
    }, []);
  
    // Gestion de l'achat
    const handleBuy = (item: { name: string; description: string }) => {
      Modal.confirm({
        title: `Acheter ${item.name}`,
        content: `Voulez-vous vraiment acheter ${item.name} ?`,
        onOk: () => {
          message.success(`Vous avez acheté ${item.name} !`);
          buyPokechakuchon(item.name);
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
        <StoreGallery items={pokechakuchon} columns={2} onBuy={handleBuy} />
      </div>
    );
  };
  
  export default StorePokechakuchon;