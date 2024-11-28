# Team

Le service Team du domaine User connaît les créatures possédées par les utilisateurs ainsi que la composition de l'équipe de l'utilisateur (formée d'au plus 5 créatures possédées par l'utilisateur), ainsi que les items qu'il peut équiper (une maximum par créature).

## Endpoints

### Collection (toutes les créatures du joueur)

Voir les créatures de la collection perssonnelle  
GET : /collection

Ajouter une créature à la collection personnelle de créatures  
POST : /collection  
body (json) : {idcreature : idcreature,  
                idespece : idespece}

Enlever une créature de la collection personnelle  
DELETE : /collection  
body (json) : {idcreature : idcreature,  
                idespece : idespece}

### Team (les créatures dans l'équipe du joueur)

Voir les créatures la team  
GET : /team

Ajouter une créature à l'équipe  
POST : /team  
body (json) : {idcreature : idcreature,  
                idespece : idespece}

Enlever une créature de l'équipe  
DELETE : /team  
body (json) : {idcreature : idcreature,  
                idespece : idespece}

Échanger une créature de l'équipe pour une autre  
PUT : /team  
body (json) : {idcreature1 : idcreature,  
                idespece1 : idespece,  
                idcreature2 : idcreature,  
                idespece2 : idespece}

### Item (les items non équipés du jouer)

Voir les items non équipés du joueur  
GET : /item

Ajouter un item aux items du joueur  
POST : /item  
body (json) : {idItem: idItem}

Supprimer un item aux items du joueur  
DELETE : /item  
body (json) : {idItem: idItem}

Ajouter un item à une créature  
POST : /item/créature  
body (json) : {idItem: idItem,
                idCreature: idCreature}

Ajouter un item à une créature   
POST : /item/créature  
body (json) : {idItem: idItem,
                idCreature: idCreature}

Supprimer un item à une créature   
DELETE : /item/créature  
body (json) : {idItem: idItem,
                idCreature: idCreature}
