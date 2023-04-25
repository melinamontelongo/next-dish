export const Breadcrumb = ({ children }) => {
    return (
        <div className="text-sm breadcrumbs font-['Inconsolata']">
            <ul>
                {children}
            </ul>
        </div>
    );
};