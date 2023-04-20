import { v4 as uuidv4 } from 'uuid';

export const Table = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table text-center w-full font-['Inconsolata'] mb-5">
                <thead>
                    <tr>
                        {data[0].map(item => <th className="text-lg font-['Croissant_One'] capitalize"key={uuidv4()}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.slice(1, data.length).map((item) => {
                        return (
                            <tr className="text-lg" key={uuidv4()}>
                                <td className="p-5">{item[0]}</td>
                                <td className="p-5">{item[1]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};