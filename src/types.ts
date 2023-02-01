export type Attribute = {
  trait_type: string,
  value: string
}

export type Metadata = {
  name: string,
  image: string,
  description: string,
  attributes: [Attribute] | null
}
