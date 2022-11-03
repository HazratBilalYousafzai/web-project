const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name=document.getElementById("city_name");
const temp_val = document.getElementById('temp_val');
const temp_status = document.getElementById("temp_status")
const day = document.getElementById("day");
const today_date = document.getElementById('today_date');
const datahide = document.querySelector(".middle_layer");

const getDay=()=>{
    const day = new Date();
    const weekDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    currDay = weekDays[day.getDay()];
    return currDay;
}

const getDate= ()=>{
    const date = new Date();
    const todayDate = date.getDate();
    const month = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AGU",
        "SEP",
        "OCT",
        "NOV",
        "DEC"
    ];
    currMonth = month[date.getMonth()];
    return `${todayDate} ${currMonth}`
    
}

day.innerHTML=getDay();
today_date.innerHTML = getDate();




const getInfo = async(event)=>{
    event.preventDefault()
    const cityVal = cityName.value;
    if(cityVal===''){
        city_name.innerHTML="Please Enter the name before search";
        datahide.classList.add("data_hide");
    }
    else{
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=9062d3adfab484a8b7a05fd7e3045796`;
        const response = await fetch(url);
        const data = await response.json();
        const arrData = [data];
        city_name.innerHTML=`${arrData[0].name} ${arrData[0].sys.country}`;
        temp_val.innerHTML=arrData[0].main.temp;
        temp_status_value=arrData[0].weather[0].main;
        
        
        
        if(temp_status_value=="Sunny"){
            temp_status.innerHTML = '<i class="fa fa-sun" style="color: #f1c40f;"></i>';
        }
        else if(temp_status_value=="Clouds"){
            temp_status.innerHTML = 
            "<i class='fa fa-cloud' style='color: #f1f2f6;'></i>";
        }
        else if(temp_status_value=="Rainy"){
            temp_status.innerHTML = "<i class='fa fa-cloud-rain' style='color: #a4b0be;'></i>";
        }
        else{
            temp_status.innerHTML = "<i class='fa fa-cloud' style='color: #44c3de;'></i>";
        }
        datahide.classList.remove("data_hide");


        } catch{
            city_name.innerHTML="Please Enter valid city name";
            datahide.classList.add("data_hide");
        }
        
    }
}

submitBtn.addEventListener("click",getInfo);