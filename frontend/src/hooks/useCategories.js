import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("categories/").then((res) => res.data),
  });
}

export function useAddCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCategory) => api.post("categories/", newCategory).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`categories/${id}/`, data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`categories/${id}/`),
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });
}
