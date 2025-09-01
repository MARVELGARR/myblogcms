
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../_AdminActions/AdminCategoryActions";
export function useGetCategory() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    select(data) {
        return data;
    },
  });
}
