import useMutation from "@/api_config/useMutation"
import WEBSITES_KEYS from "./keys"

export const useWebsitesActions = (id?: string) => {
  const { mutate: create, loading: createLoading } = useMutation("websites", {
    invalidateQueries: [WEBSITES_KEYS.getWebsites],
  })
  const { mutate: update, loading: updateLoading } = useMutation(
    `websites/${id}`,
    {
      method: "put",
      invalidateQueries: [WEBSITES_KEYS.getWebsites],
    }
  )
  const { mutate: deleteWebsite, loading: deleteWebsiteLoading } = useMutation(
    `websites/${id}`,
    {
      method: "delete",
      invalidateQueries: [WEBSITES_KEYS.getWebsites],
    }
  )
  const { mutate: updateUrls, loading: updateUrlsLoading } = useMutation(
    `website-urls/${id}`,
    {
      method: "patch",
      invalidateQueries: [WEBSITES_KEYS.getWebsites],
    }
  )

  return {
    create,
    createLoading,
    update,
    updateLoading,
    deleteWebsite,
    deleteWebsiteLoading,
    updateUrls,
    updateUrlsLoading,
  }
}

export const useExtractSelectors = () => {
  const { mutate: extractSelectors, loading: extractSelectorsLoading } =
    useMutation("/ai/extract-selectors")
  return {
    extractSelectors,
    extractSelectorsLoading,
  }
}

export const useGenerateAndCreateWebsites = () => {
  const { mutate: generateAndCreate, loading } = useMutation(
    "websites/generate-and-create",
    {
      invalidateQueries: [WEBSITES_KEYS.getWebsites],
    }
  )
  return {
    generateAndCreate,
    loading,
  }
}

export const useCreatePopularWebsites = () => {
  const {
    mutate: createPopularWebsites,
    loading: createPopularWebsitesLoading,
  } = useMutation("/websites/create-popular")
  return {
    createPopularWebsites,
    createPopularWebsitesLoading,
  }
}
