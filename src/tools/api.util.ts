export class Util {
  public static async separateId(id: string): Promise<object> {
    const customerId: string = id.slice(0, 4);
    const sportsId: string = id.slice(5, 3);
    const venueId: string = id.slice(8, 3);
    const sectorId: string = id.slice(11, 3);

    return {
      customerId,
      sportsId,
      venueId,
      sectorId,
    };
  }

  public static toCamel = (s: string) => {
    return s.replace(/([_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('_', '');
    });
  };
}
