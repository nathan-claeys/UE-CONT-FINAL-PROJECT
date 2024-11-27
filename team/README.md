# Team

Le service Team du domaine User connaît les créatures possédées par les utilisateurs ainsi que la composition de l'équipe de l'utilisateur (formée d'au plus 5 créatures possédées par l'utilisateur)

## Endpoints

Voir les créatures de la collection perssonnelle  
GET : /collection

Voir les créatures la team  
GET : /team

Ajouter une créature à la collection personnelle de créatures  
POST : /collection  
body (json) : {idcreature : idcreature,  
                idespece : idespece}

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

Enlever une créature de la collection personnelle  
DELETE : /collection  
body (json) : {idcreature : idcreature,  
                idespece : idespece}