let elems;
document.addEventListener('DOMContentLoaded', function () {
    elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
});


document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
     M.Sidenav.init(elems);
});

//variable
let obj = {
    "mobile": []
};
let size = 0;


document.getElementById("form-add-model").addEventListener("submit", getModelDetail);
document.getElementById("add").addEventListener("click", add_quantity);
document.getElementById("remove").addEventListener("click", remove_quantity);
document.getElementById("detail").addEventListener("click", show_details);

window.onload = loadData;

// get new model data
function getModelDetail() {
    try {
        event.preventDefault();
        console.log("run");
        let model = document.getElementById("name").value;
        let amount = Number(document.getElementById("amount").value);
        let temp = {};
        temp.name = model;
        temp.amount = amount;
        temp.quantity = 0;
        obj.mobile[size] = temp;
        console.log(obj);
        let obj2 = JSON.stringify(obj);
        localStorage.setItem("mobileDetail", obj2);
        loadData();
        M.toast({ html: '<i class="material-icons">done</i>Model Added', displayLength: 1200, classes: "green darken-1" });
        document.getElementById("form-add-model").reset();
        show_details();
    }
    catch (err) {
        M.toast({ html: '<i class="material-icons">close</i>' + err.name, displayLength: 1200, classes: "red lighten-1" });
        document.getElementById("form-add-model").reset();
        console.log(err.message);
    }

}

// load data
function loadData() {
    document.getElementById("preloader").style = "display:none";
    try {
        let temp = JSON.parse(localStorage.getItem("mobileDetail"));
        if (temp != null) {
            document.getElementById("modelList").innerHTML = `<option value="-1" disabled selected>Choose Model</option>`;
            obj = temp;
            size = obj.mobile.length;
            let option = document.getElementById("modelList").innerHTML;
            for (let i = 0; i < size; i++) {
                option += `<option value="${i}">${obj.mobile[i].name}</option>`
            }
            document.getElementById("modelList").innerHTML = option;
            elems = document.querySelectorAll('select');
            M.FormSelect.init(elems);
        }
    }
    catch (err) {
        console.log(err.message);
        console.log(err.name);
    }
}


// add quantity
function add_quantity() {
    try {
        let qua = Number(document.getElementById("quantity").value);
        let model = Number(document.getElementById("modelList").value);
        if (qua > 0 && model != -1) {
            obj.mobile[model].quantity = obj.mobile[model].quantity + qua;
            localStorage.setItem("mobileDetail", JSON.stringify(obj));
            M.toast({ html: '<i class="material-icons">done</i>Quantity updated', displayLength: 1200, classes: "green darken-1" });
            document.getElementById("quantity-add-remove").reset();
            show_details();
        }
        else
            M.toast({ html: 'Select model and enter quantity', displayLength: 1200, classes: "blue lighten-1" });
    } catch (err) {
        M.toast({ html: '<i class="material-icons">close</i>' + err.name, displayLength: 1200, classes: "red lighten-1" });
        document.getElementById("quantity-add-remove").reset();
        console.log(err.message)
    }

}

// remove quantity
function remove_quantity() {
    try {
        let qua = Number(document.getElementById("quantity").value);
        let model = Number(document.getElementById("modelList").value);
        if (qua > 0 && model != -1) {
            obj.mobile[model].quantity = obj.mobile[model].quantity - qua;
            localStorage.setItem("mobileDetail", JSON.stringify(obj));
            M.toast({ html: '<i class="material-icons">done</i>Quantity updated', displayLength: 1200, classes: "green darken-1" });
            document.getElementById("quantity-add-remove").reset();
            show_details()
        }
        else
            M.toast({ html: 'Select model and enter quantity', displayLength: 1200, classes: "blue lighten-1" });
    } catch (err) {
        M.toast({ html: '<i class="material-icons">close</i>' + err.name, displayLength: 1200, classes: "red lighten-1" });
        document.getElementById("quantity-add-remove").reset();
        console.log(err.message)
    }

}

// show incentive details

function show_details() {
    try {
        if (obj.mobile.length > 0) {
            document.getElementById("ince-detail").innerHTML = "";
            let data = '';
            total = 0;
            for (let i = 0; i < obj.mobile.length; i++) {
                data += ` 
                    <div class="col s12 m6 l4">
                        <div class="card card-m">
                            <div class="card-content">
                                <span class="card-title light-blue-text text-darken-1">${obj.mobile[i].name}</span>
                                <p>Incentive : ₹ ${obj.mobile[i].amount}</p>
                                <p>Quantity : ${obj.mobile[i].quantity}</p>
                                <p>Total Incentive : ₹ ${obj.mobile[i].amount * obj.mobile[i].quantity}</p>
                            </div>
                        </div>
                    </div>`
                total += obj.mobile[i].amount * obj.mobile[i].quantity;
            }
            document.getElementById("ince-detail").innerHTML = data;
            document.getElementById("total").innerHTML = "Total Incentive is ₹ " + total;

        }
        else
            M.toast({ html: 'Data not found', displayLength: 1200, classes: "blue lighten-1" });
    }
    catch (err) {
        M.toast({ html: '<i class="material-icons">close</i>' + err.name, displayLength: 1200, classes: "red lighten-1" });
    }
}