const essayIsOpen = ref(false);

export default function useEssay() {
  function handleEssay() {
    essayIsOpen.value = !essayIsOpen.value;
  }

  return { essayIsOpen, handleEssay };
}
