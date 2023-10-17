
const input_el = document.getElementById("input-el");
const input_btn = document.getElementById("input-btn");
const h1_el = document.getElementById("h1-el")
const ul_el = document.getElementById("ul-el");
const del_btn = document.getElementById("del-btn");
const tab_btn = document.getElementById("tab-btn");

const localStorageKey = "myLead";

let myLead = [];

let localStorageLeads = JSON.parse(localStorage.getItem(localStorageKey));

if (localStorageLeads) {
    myLead = localStorageLeads;
    render(myLead);
}

function render(leads) {
    
    let listItems = "";

    for (let i = 0; i < leads.length; i++) {

        // listItems += "<li><a target = _blank href='" + myLead[i] +"'>" + myLead[i] + "</a></li>";
        listItems += 
            `<li>
                <a target = _blank href = ${leads[i]}>
                    ${leads[i]}
                </a>
            </li>`;
    }
    
    ul_el.innerHTML = listItems;
}

input_btn.addEventListener("click", () => {
    
    if(input_el.value!=="")
    {
        myLead.push(input_el.value);
        input_el.value  = "";
        
        localStorage.setItem(localStorageKey,JSON.stringify(myLead));

        render(myLead);   
    }
    else
    {
        alert("Enter the value first!");
    }
});

del_btn.addEventListener("dblclick", () => {

    localStorage.clear();
    myLead = [];
    render(myLead);

});



tab_btn.addEventListener("click",()=>{

    // let currUrl = window.location.href;

    chrome.tabs.query({active:true, currentWindow:true}, (tabs)=>{

        myLead.push(tabs[0].url);
        localStorage.setItem(localStorageKey,JSON.stringify(myLead));
        render(myLead);

    })

    
})