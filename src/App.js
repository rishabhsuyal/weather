import { useState } from "react";
import axios from "axios";
import MapChart from "./component/MapChart";
import { Tooltip, Button } from "@material-tailwind/react";
import rateLimit from 'axios-rate-limit';
import {
  useQuery,
} from '@tanstack/react-query'
import Spinner from "./component/Spinner";
import Error from "./component/Error";
import Table from "./component/Table";

function App() {

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const d = new Date();
  const axioLimited = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 60 * 1000 })

  const [stateName, setstateName] = useState("Noida")
  const [countryCode, setCountryCode] = useState("+91");
  const [stateCode, setStateCode] = useState("");

  const getLocation = async () => {
    var uri = `https://api.openweathermap.org/data/2.5/weather?q=${stateName},${stateCode},${countryCode}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
    const res = await axioLimited.get(uri);
    return res.data;
  }

  const { isLoading, isError, data, refetch,isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: getLocation,
    refetchInterval:60*1000,
    retry:0,
    retryOnMount:false,
  })

  if (isLoading) {
    return (<Spinner/>)
  }

  return (
    <div className="m-10 flex flex-col gap-5">
      <div className="flex lg:flex-row flex-col  mt-2 justify-center">
        <div class="relative h-11 w-[250px]">
          <input
            onChange={(e) => setstateName(e.target.value)}
            class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
          />
          <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Enter Location
          </label>
        </div>

        <div class="relative h-11 w-[250px]">
          <input
            onChange={(e) => setStateCode(e.target.value)}
            class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
          />
          <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Enter State Code (optional)
          </label>
        </div>

        <div class="relative h-11 w-[250px]">
          <input
            onChange={(e) => setCountryCode(e.target.value)}
            value={countryCode}
            class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
          />
          <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Enter Contry Code
          </label>
        </div>
        <button
          class="rounded-xl bg-blue-500 mx-2 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
          type="button"
          data-ripple-light="true"
          onClick={refetch}
        >
          Get Weather
        </button>
        <div>
          <Tooltip content={
            <Table />
          } placement="bottom">
            <Button className="text-black">info</Button>
          </Tooltip>
        </div>

      </div>

      {
        isError ?
         <Error/>
        :
        isFetching ? <Spinner/> :
        <div className="flex justify-center items-center">
        <div className="p-5 border-solid rounded-lg border-2 border-blue-500 w-1/2" >
          <div className="flex align-middle gap-2 flex-col lg:flex-row">
            <MapChart coords={data.coord} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
            <div className="flex gap-2 items-center flex-col lg:flex-row">
              <div className="p-2 border-solid rounded-lg border-2 border-blue-500">
                <p className="text-5xl">{data.main.temp} °C</p>
              </div>
              <div className="text-sm">
                <p >Max : {data.main.temp_max} °C</p>
                <p>Min : {data.main.temp_min} °C</p>
                <p>Humidity : {data.main.humidity} %</p>
              </div>
            </div>
          </div>

          <div className="flex my-5 gap-2 flex-col lg:flex-row">
            <p className="text-4xl p-2 border-solid rounded-lg border-2 border-blue-500">{data.weather[0].main}</p>
            <div>
              <p>{data.weather[0].description.toUpperCase()}</p>
              <p>Wind: {data.wind.speed} m/s</p>
            </div>

          </div>
          <div>
            <p className="text-4xl p-2 border-solid rounded-lg border-2 border-blue-500">{weekday[d.getDay()]},{d.getDate()},{d.getFullYear()} {data.name}</p>
          </div>
        </div>
      </div>
        
      }
      
    </div>
  );
}

export default App;
