        /* TODO: improve performance with maps?
      Even better, binary trees/AVL trees */
export const getIndexInFilteredArray = (index: number, filteredArr: any[]) => {
  return filteredArr.findIndex((v) => v === index);
};
