

export const Breadcrumb = ({ children }) => {
    return (
        <div className="text-sm breadcrumbs">
            <ul>
                {children}
            </ul>
        </div>
    );
};