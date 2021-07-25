//const sessionStorage = require("sessionstorage");

   document.addEventListener("DOMContentLoaded", function (event) {

       let reduce1 = document.getElementById("reduce1");
       let increase1 = document.getElementById("increase1");
       let main1 = document.getElementById("main1");
       let reduce2 = document.getElementById("reduce2");
       let increase2 = document.getElementById("increase2");
       let main2 = document.getElementById("main2");
       let reduce3 = document.getElementById("reduce3");
       let increase3 = document.getElementById("increase3");
       let main3 = document.getElementById("main3");
       let i1 = 0, i2 = 0 , i3 = 0;
       initial_cond = (reduce,increase,main,i) => {
           if (i === 0) {
               reduce.style.visibility = "hidden";
               increase.style.visibility = "hidden";
               main.style.visibility = "visible";
               main.innerHTML = "Add to Cart";
               main.id = "main";
           }
       }
       sessionStorage.setItem("i1",0);
       sessionStorage.setItem("i2",0);
       sessionStorage.setItem("i3",0);
       initial_cond(reduce3,increase3,main3,i3);
       initial_cond(reduce2,increase2,main2,i2);
       initial_cond(reduce1,increase1,main1,i1);
       main1.onclick = () => {
           if (main1.id) {
            i1 = 1;
            sessionStorage.setItem("i1",i1);
           }
           reduce1.style.visibility = "visible";
           increase1.style.visibility = "visible";
           main1.innerHTML = i1;
           main1.id = "";
       }
       main2.onclick = () => {
           if (main2.id) {
            i2 = 1;
            sessionStorage.setItem("i2",i2);
           }
           reduce2.style.visibility = "visible";
           increase2.style.visibility = "visible";
           main2.innerHTML = i2;
           main2.id = "";
       }
       main3.onclick = () => {
           if (main3.id) {
            i3 = 1;
            sessionStorage.setItem("i3",i3);
           }
           reduce3.style.visibility = "visible";
           increase3.style.visibility = "visible";
           main3.innerHTML = i3;
           main3.id = "";
       }
       increase1.onclick = () => {
           i1 += 1;
           sessionStorage.setItem("i1",i1);
           main1.innerHTML = i1;
       }
       reduce1.onclick = () => {
           i1 -= 1;
           sessionStorage.setItem("i1",i1);
           if (i1 === 0) initial_cond(reduce1,increase1,main1,i1);
           else main1.innerHTML = i1;
       }
       increase2.onclick = () => {
           i2 += 1;
           sessionStorage.setItem("i2",i2);
           main2.innerHTML = i2;
       }
       reduce2.onclick = () => {
           i2 -= 1;
           sessionStorage.setItem("i2",i2);
           if (i2 === 0) initial_cond(reduce2,increase2,main2,i2);
           else main2.innerHTML = i2;
       }
       increase3.onclick = () => {
           i3 += 1;
           sessionStorage.setItem("i3",i3);
           main3.innerHTML = i3;
       }
       reduce3.onclick = () => {
           i3 -= 1;
           sessionStorage.setItem("i3",i3);
           if (i3 === 0) initial_cond(reduce3,increase3,main3,i3);
           else main3.innerHTML = i3;
       }
   });
