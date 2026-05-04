import { ref } from 'vue'
import type { Tag } from '../interfaces/TagResponse'

export function useTagsManager(
  tags: { value: Tag[] | undefined | null },
  setFieldValue: (field: string, value: unknown) => void,
  fieldName: string = 'tags',
) {
  const tagInput = ref('')

  // const addTag = (e: KeyboardEvent) => {
  //   // Aceptamos Enter o Coma
  //   if (e.key === 'Enter' || e.key === ',') {
  //     e.preventDefault()

  //     const tag = tagInput.value.trim().replace(/,$/, '') // Limpiamos la coma si existe
  //     const currentTags = tags.value ?? []

  //     if (tag && !currentTags.includes(tag)) {
  //       setFieldValue(fieldName, [...currentTags, tag])
  //     }

  //     tagInput.value = ''
  //   }
  // }

  // const removeTag = (tagToRemove: string) => {
  //   const currentTags = tags.value ?? []
  //   setFieldValue(
  //     fieldName,
  //     currentTags.filter((t) => t !== tagToRemove),
  //   )
  // }

  return {
    tagInput,
    // addTag,
    // removeTag,
  }
}
