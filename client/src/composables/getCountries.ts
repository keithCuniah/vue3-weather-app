import { ref } from "vue";

const getCountries = () => {
  const countries = ref<{ id: number; country: string }[]>([]);
  let error = ref<string | null>(null);

  const load = async () => {
    try {
      const data: Response = await fetch("http://localhost:4000/api/countries");
      if (!data.ok) {
        throw Error("No data available");
      }
      countries.value = await data.json();
      countries.value = countries.value.sort(
        (
          a: { id: number; country: string },
          b: { id: number; country: string }
        ) => (a.country > b.country ? 1 : -1)
      );
    } catch (err) {
      error.value = err as string;
    }
  };

  return { countries, error, load };
};

export default getCountries;
