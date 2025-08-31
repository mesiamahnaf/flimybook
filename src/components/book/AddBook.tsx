"use client"
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { Input, Select, Loading, Container, Datepicker } from "../ui";

//Types
import { BookFormInput } from "@/server/books/input/book.input";

//Trpc
import { trpc } from "@/trpc/client";

const AddBook = () => {
    //Form Initialize
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset
    } = useForm<BookFormInput>();

    //Tanstack
    const utils = trpc.useUtils();
    const { isPending, mutate } = trpc.book.add.useMutation({
        onSuccess: (data) => {
            utils.users.count.invalidate();
            return utils.book.list.refetch().finally(() => {
                toast.success(data.message);
                reset();
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    //Submit
    const onSubmit: SubmitHandler<BookFormInput> = (value) => {
        mutate(value)
    }

    return (
        <Container className="py-14">
            <div className="grid grid-cols-3 xl:grid-cols-3 xxs:grid-cols-1 gap-10 px-20 lg:px-20 lsm:px-16 sm:px-3 xxs:px-2">
                <div className="col-span-2 xxs:max-xl:col-span-1">
                    <h4 className="text-4xl font-bold mb-10">Add books to reading list</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label="Name"
                            id="name"
                            placeholder="Name"
                            {...register("name", { required: "Book name is required." })}
                            errorMessage={errors.name?.message}
                        />
                        <Input
                            label="Writer"
                            id="writer"
                            placeholder="Writer"
                            {...register("writer", { required: "Writer name is required." })}
                            errorMessage={errors.writer?.message}
                        />
                        <Controller
                            control={control}
                            name="date"
                            rules={{ required: "Reading date is required" }}
                            render={({ field: { value, onChange } }) => (
                                <Datepicker
                                    id="datePicker"
                                    label="Read Date"
                                    value={value}
                                    onChange={onChange}
                                    errorMessage={errors.date?.message}
                                />
                            )}
                        />
                        <Input
                            label="How many page?"
                            id="PageNumber"
                            placeholder="Total Page"
                            {...register("totalPage", { required: "Page number is required." })}
                            inputType="int"
                            errorMessage={errors.totalPage?.message}
                        />
                        <Input
                            label="How many day(s)?"
                            id="days"
                            placeholder="Total Days"
                            {...register("totalDays", { required: "Total days is required" })}
                            inputType="int"
                            errorMessage={errors.totalDays?.message}
                        />
                        <Controller
                            control={control}
                            name="type"
                            rules={{ required: "Book type is required" }}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    label="Book type!"
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    errorMessage={errors.type?.message}
                                    options={TypesData.map((a) => ({ value: a, label: a }))}
                                />
                            )}
                        />
                        <div>
                            <div className="mb-1 relative">
                                <button className="w-full bg-gradient-to-r from-c-initial  to-c-final text-white py-6 text-lg rounded-xl" type="submit" disabled={isPending}>
                                    <span className={`${isPending && "opacity-20"}`}>Add Books</span>
                                    {isPending &&
                                        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                            <Loading size={35} />
                                        </div>
                                    }
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div></div>
            </div >
        </Container>
    );
};

export default AddBook;


//Data
const TypesData = [
    "Novel", "Poetry", "Short Story Collection", "Novella", "Anthology", "Play", "Essay Collection", "Biography", "Autobiography", "Travel Writing", "Historical Fiction", "Science Fiction", "Fantasy", "Mystery", "Thriller", "Romance", "Dystopian", "Graphic Novel", "Comic Book", "Science Writing"
]