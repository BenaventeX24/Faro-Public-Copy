export class PokemonSerializer {
  static deSerialize(data) {
    return {
      id: data.id,
      name: data.name,
      weight: data.weight,
      height: data.height,
      abilities: data.abilities,
    };
  }
}
