import NxWelcome from './nx-welcome';
import {QueryClient, QueryClientProvider} from "react-query";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

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
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmitHandler = (data: LoginFormInput) => {
    console.log({data});
    reset();
  };


  return (
    <QueryClientProvider client={queryClient}>
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
      <NxWelcome title="front"/>
    </QueryClientProvider>
  );
}

export default App;
