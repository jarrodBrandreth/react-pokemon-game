export type SvgComponentAsProps = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }
  >;

  export interface CharactersList {
    name: string;
    url: string;
  }

  export interface CurrentCharacterProps {
    name: string;
    front_image: string;
    back_image: string;
  }