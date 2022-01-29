type TEmiProps = {
    emi: number;
};

export const Emi = ({ emi }: TEmiProps) => {
    return (
        <div className="mt-6">
            <span className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-blue-500 text-xs font-bold text-white">
                {`₹ ${emi}`}
            </span>
        </div>
    );
};