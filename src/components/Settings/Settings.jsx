import maintainImg from "../../assets/images/maintain.jpg"
import useTitle from "../../hooks/useTitle";

const Settings = () => {
    useTitle('Settings');
    return (
        <div className="">
            <img className="w-9/2 mx-auto h-[800px]" src={maintainImg} alt="" />
        </div>
    );
};

export default Settings;