import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useSuppliers() {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: () => api.get("suppliers/").then((res) => res.data),
  });
}

export function useAddSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newSupplier) => api.post("suppliers/", newSupplier).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries(["suppliers"]),
  });
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`suppliers/${id}/`, data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries(["suppliers"]),
  });
}

export function useDeleteSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`suppliers/${id}/`),
    onSuccess: () => queryClient.invalidateQueries(["suppliers"]),
  });
}
