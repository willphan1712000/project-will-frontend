import styles from './Controller.styles';

const Cotroller = ({ ...props }: React.ComponentProps<'div'>) => {
    return (
        <div {...props} style={styles.controllerContainer}>
            <div className="controller" style={styles.controller}>
                <div className="dot resize resize-topleft">
                    <div className="circle"></div>
                </div>
                <div className="dot resize resize-topright">
                    <div className="circle"></div>
                </div>
                <div className="dot resize resize-bottomleft">
                    <div className="circle"></div>
                </div>
                <div className="dot resize resize-bottomright">
                    <div className="circle"></div>
                </div>
                <div className="dot rotate">
                    <i className="fa-solid fa-rotate"></i>
                </div>
                <div
                    className="dot rotate shadow"
                    style={{ visibility: 'hidden' }}
                >
                    <i className="fa-solid fa-rotate"></i>
                </div>
                <div className="dot delete">
                    <i className="fa-solid fa-trash"></i>
                </div>
                <div
                    className="dot delete shadow"
                    style={{ visibility: 'hidden' }}
                >
                    <i className="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
    );
};

export default Cotroller;
