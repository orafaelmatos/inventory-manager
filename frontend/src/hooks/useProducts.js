import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => api.get("products/").then(res => res.data),
  });
}

export function useAddProduct() {
  const queryClient = useQueryClient();
   return useMutation({
    mutationFn: (newProduct) => api.post("products/", newProduct).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) =>
      api.put(`products/${id}/`, data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`products/${id}/`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}
