
/** Used to locate the available position in the filtered array for an item from the origin array.
 * NOTE: This function does not check that the item exists in the filtered array.
 */
/* If index is already inserted, return index */
export const locateAvailablePosition = (originIndex: number, indexes: number[]): number => {
    /* Indexes contain a "mapping" of origin => filtered indexes, e.g.:
      [
        1,
        3,
        4
      ]
  
      means
  
      1 => 0
      3 => 1
      4 => 2
  
    */
    /* The goal is to find the last item before originIndex that has been mapped in the indexes array */
    let resolvedPreviousIndex = -1;
    /* Traverse indexes and find */
    for (let i = 0, j = indexes.length; i < j; i++) {
        if (indexes[i] < originIndex) {
            resolvedPreviousIndex = i;
        }
    }
    let foundIndex = resolvedPreviousIndex + 1;

    return foundIndex;
};
