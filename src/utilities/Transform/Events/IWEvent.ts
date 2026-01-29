export default interface IWEvent {
    drag(
        e:
            | MouseEvent
            | React.MouseEvent<HTMLElement, MouseEvent>
            | TouchEvent
            | React.TouchEvent<HTMLElement>
    ): void;
    rotate(
        e:
            | MouseEvent
            | React.MouseEvent<HTMLElement, MouseEvent>
            | TouchEvent
            | React.TouchEvent<HTMLElement>,
        options: {
            top?: boolean;
            bottom?: boolean;
        }
    ): void;
    resize(
        e:
            | MouseEvent
            | React.MouseEvent<HTMLElement, MouseEvent>
            | TouchEvent
            | React.TouchEvent<HTMLElement>,
        options: {
            topLeft?: boolean;
            topRight?: boolean;
            bottomLeft?: boolean;
            bottomRight?: boolean;
        }
    ): void;
}
