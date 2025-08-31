import { IconTrash } from "@tabler/icons-react";
import { Loading, Dialog } from "@/components/ui";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    fetching: boolean;
}

const Confirm = ({ open, onClose, onConfirm, fetching }: Props) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            className="w-[300px] py-7"
        >
            <IconTrash size={30} className="mx-auto text-red-600" />
            <h5 className="mt-2  text-center mb-2 text-red-600">Delete?</h5>
            <p className="font-medium opacity-70 text-center">This action can&apos;t be undone!</p>
            <div className="mt-6 flex gap-5 justify-center">
                <button color="indigo" className="h-[36px] w-[90px] flex items-center justify-center focus:ring-0 border border-solid border-c-initial rounded-lg text-c-initial" onClick={onClose}><span>Cancel</span></button>
                <button className="bg-gradient-to-r from-c-initial to-c-final rounded-lg text-white h-[36px] w-[90px] flex justify-center items-center" onClick={() => onConfirm()} disabled={fetching}>
                    {fetching ? (
                        <div>
                            <Loading />
                        </div>
                    ) : (
                        <span>Delete</span>
                    )}
                </button>
            </div>
        </Dialog>
    );
};

export default Confirm;