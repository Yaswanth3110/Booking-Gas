const fs = require("fs");
const d = new Date();
const user_data = require("../Json_Data/user-data");
const orders_data = require("../Json_Data/orders-data.json");
const register = (body,status) => 
{
    let check_customer = 0 ;
    for(let i = 0 ; i < user_data.length ; i++ )
    {
        if(user_data[i]["user_data"]["emailid"] === body["emailid"])
        {
            check_customer = 1;
            break;
        }
    }
    //const customer = user_data.filter(check_customer => check_customer["user_data"]["emailid"] === body["emailid"]);

    if(check_customer === 1) status(0);
    else{
        user_data.push({
            _id: user_data.length,
            user_data: body,
            date: d.getDate()+"/"+parseInt(d.getMonth()+1)+"/"+d.getFullYear(),
            time : d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
        });
        fs.writeFile("./Json_Data/user-data.json", JSON.stringify(user_data),err => {
            if(err) console.log(err);
            else status(1);
        })
    }
}


const login = (body,status) =>  
{
const filtered_data = user_data.filter(data => data["user_data"]["emailid"] === body["emailid"] && data["user_data"]["create_password"] === body["password"] );
if(filtered_data.length === 1) status(1,filtered_data) ;
else status(0,0) ;
}

const upload_order_details = (body,user_id,username,address,status) => 
{
    orders_data.unshift({
        _id:orders_data.length,
        user_id:user_id,
        username:username,
        order_details : JSON.parse(body["order_data"]) ,
        address : address,
        status:"Not Delivered",
        ordered_date: d.getDate()+"/"+parseInt(d.getMonth()+1)+"/"+d.getFullYear(),
        ordered_time : d.getHours()+":"+d.getMinutes()+":"+d.getSeconds(),
        delivered_date:"-",
        delivered_time : "-"
    });
    fs.writeFile("./Json_Data/orders-data.json", JSON.stringify(orders_data),err => {
        if(err) console.log(err);
        else status(1);
    })
}

const ordered_items = (id) => 
{
    const items = orders_data.filter(x => x["user_id"] === id);
    return items ;
}

const see_more = (username,_id,status) => 
{
    const items = orders_data.filter(x => x["_id"] === _id && x["username"] === username);
    if(items.length === 1)
    {
        status(items[0],1);
    }
    else status(0,0);
}

module.exports = {register,login,upload_order_details,ordered_items,see_more}
