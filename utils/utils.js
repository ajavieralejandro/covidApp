export default function CalculateRisk(contacts){
    console.log("Hola estoy calculando el riesgo");
    console.log("contacts es :",contacts);
    let aux = 0;
    let verde = 0;
    let amarillo = 0;
    let rojo = 0;


    
    contacts.forEach(contact => {
        console.log(contact);
        aux++;
        switch(contact.risk_status){
            case 'green' : 
                verde++;
                break;
            case 'yellow' :
                amarillo++;
                break;
            case 'red':{
                rojo++;
                if(rojo>4)
                    return 'rojo'
                    break;
            }
            default : 
            break;
        }
        });

        if(rojo<2)
        {
            if(amarillo<10)
                return "verde";
        }
        else
         return "amarillo";

    }