import {QueryClient, QueryClientProvider} from "react-query";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import {LatLngExpression} from "leaflet";
import "./app.module.scss";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Welcome to React": "Welcome to React and react-i18next"
        }
      }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });


const queryClient = new QueryClient()

type LoginFormInput = {
  email: string,
  password: string
}
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

export function App() {
  const { t } = useTranslation();
  console.log("APP")
  const position: LatLngExpression = {
    lat: 51.505,
    lng: -0.09
  }

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmitHandler = (data: LoginFormInput) => {
    console.log({data});
    reset();
  };


  return (
    <ChakraProvider>
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        <GridItem w='100%' h='10' bg='blue.500' />
        <GridItem w='100%' h='10' bg='blue.500' />
        <GridItem w='100%' h='10' bg='blue.500' />
        <GridItem w='100%' h='10' bg='blue.500' />
        <GridItem w='100%' h='10' bg='blue.500' />
      </Grid>

      <QueryClientProvider client={queryClient}>
        {t('Welcome to React')}

        <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
          <label>
            Email:
            <input {...register("email")} placeholder="email" type="email" required/>
            <p>{errors["email"]?.message}</p>
          </label>
          <label>
            Password
            <input
              {...register("password")}
              placeholder="password"
              type="password"
              required
            />
            <p>{errors["password"]?.message}</p>
          </label>


          <button type="submit">Sign in</button>
        </form>
        <MapContainer center={[45.4, -75.7]} zoom={12} scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </QueryClientProvider>
    </ChakraProvider>

  );
}

export default App;
