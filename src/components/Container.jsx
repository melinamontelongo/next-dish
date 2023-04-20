export const Container = (props) => {
    return(
        <div className="min-h-screen pt-32 px-10 pb-10 bg-neutral/25 bg-gradient-to-r from-secondary/75">
            {props.children}
        </div>
    );
};