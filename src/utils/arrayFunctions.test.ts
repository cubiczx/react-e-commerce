import { countDuplicates, removeDuplicates, removeItemOnce } from './arrayFunctions';

describe('arrayFunctions', () => {
  describe('countDuplicates', () => {
    test('cuenta correctamente los duplicados de un valor', () => {
      const array = [1, 2, 3, 1, 1, 4, 5, 1];
      expect(countDuplicates(1, array)).toBe(4);
    });

    test('retorna 0 si el valor no existe', () => {
      const array = [1, 2, 3, 4, 5];
      expect(countDuplicates(10, array)).toBe(0);
    });

    test('funciona con arrays vacíos', () => {
      expect(countDuplicates(1, [])).toBe(0);
    });

    test('funciona con strings', () => {
      const array = ['a', 'b', 'a', 'c', 'a'];
      expect(countDuplicates('a', array)).toBe(3);
    });
  });

  describe('removeDuplicates', () => {
    test('elimina duplicados de un array de números', () => {
      const array = [1, 2, 3, 1, 2, 4, 5];
      const result = removeDuplicates(array);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('retorna array vacío si el input es vacío', () => {
      expect(removeDuplicates([])).toEqual([]);
    });

    test('funciona con strings', () => {
      const array = ['a', 'b', 'c', 'a', 'b'];
      const result = removeDuplicates(array);
      expect(result).toEqual(['a', 'b', 'c']);
    });

    test('no modifica array sin duplicados', () => {
      const array = [1, 2, 3, 4, 5];
      const result = removeDuplicates(array);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('removeItemOnce', () => {
    test('elimina la primera ocurrencia de un valor', () => {
      const array = [1, 2, 3, 1, 4];
      const result = removeItemOnce(array, 1);
      expect(result).toEqual([2, 3, 1, 4]);
    });

    test('no modifica el array si el valor no existe', () => {
      const array = [1, 2, 3, 4];
      const result = removeItemOnce(array, 10);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    test('funciona con arrays vacíos', () => {
      const result = removeItemOnce([], 1);
      expect(result).toEqual([]);
    });

    test('elimina solo una ocurrencia aunque haya múltiples', () => {
      const array = [1, 1, 1, 2, 3];
      const result = removeItemOnce(array, 1);
      expect(result).toEqual([1, 1, 2, 3]);
    });
  });
});
