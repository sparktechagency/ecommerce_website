import { Select } from "antd";


const SelectYourVehicle = () => {
    return (
        <div className="container mx-auto shadow-md border-t-[10px] border-t-primary border-b border-b-[#FCCEB0] border-r border-r-[#FCCEB0] border-l border-l-[#FCCEB0] py-10">
            <div className=" text-center">
                <h2 className=" text-4xl font-semibold">Select Your Vehicle</h2>
                <p className=" text-[#5A5B54] mt-3">For finding the correct part</p>
            </div>
            <div>
                <div className="flex items-center ">
                    <span className=" bg-primary py-2 px-3 text-white">1</span>
                    <Select
                        defaultValue="lucy"
                        style={{ width: 120 }}
                        options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                            { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectYourVehicle;