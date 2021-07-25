const arr = [sessionStorage.getItem('i1'), sessionStorage.getItem('i2'), sessionStorage.getItem('i3')]
const headings = ["Hp Gas", "Bharat Gas", "Indian Gas"]
const prices = [100,150,320]
let total_price = 0 ;
let ordered_items = {} ;
document.getElementById("place_order").style.visibility= "hidden";
let data = "<thead><tr><th>Gas</th><th>Quantity</th><th>Price</th></tr></thead><tbody>";
for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
        data +=`<tr>
               <td>${headings[i]}</td>
               <td> ${arr[i]}</td>
               <td>${prices[i]*arr[i]} /-</td>
            </tr>`;
            total_price += prices[i]*arr[i] ;
            ordered_items[headings[i]] = arr[i];
    }
}
data += `<tr>
<th colspan="2">Total </th>
<th>${total_price} /-</th>
</tr>
</tbody>`;
if(total_price > 0)
{
    
    document.getElementById("order-details").value = JSON.stringify(ordered_items) ;
    document.getElementById("cart-data").innerHTML = data ;
    document.getElementById("place_order").style.visibility= "visible";
    document.getElementById("empty_cart_image").style.visibility= "hidden";
}
else
{
    
    document.getElementById("empty_cart_image").style.visibility= "visible";
}

