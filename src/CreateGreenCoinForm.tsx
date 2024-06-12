import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import MapboxPicker from "./MapboxPicker";
import ImageDropzoneInput from "./ImageDropzoneInput";

type Inputs = {
  name: string;
  ticker: string;
  file: FileList;
  description: string;
};

export default () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-[250px_1fr] gap-4 mb-4">
        <div>
          <ImageDropzoneInput
            errors={errors}
            control={control}
            name="file"
            required={true}
          />

          {/* <div
            className="tooltip mr-2"
            data-tip="Input coordinates or drag the pin to the desired location"
          >
            <div className="flex justify-center items-center cursor-pointer w-5 h-5 rounded-full bg-secondary font-bold">
              ?
            </div>
          </div>
          <strong>Choose location:</strong> */}
        </div>
        <div>
          <label
            className={clsx(
              "input input-bordered flex items-center gap-2 mb-4",
              errors.name && "input-error"
            )}
          >
            <strong>Name:</strong>
            <input
              type="text"
              {...register("name", { required: true })}
              className="grow"
              placeholder="Your green coin name"
            />
            {errors.name && <span>*required</span>}
          </label>
          <label
            className={clsx(
              "input input-bordered flex items-center gap-2 mb-4",
              errors.ticker && "input-error"
            )}
          >
            <strong>Ticker:</strong>
            <input
              type="text"
              {...register("ticker", { required: true })}
              className="grow uppercase"
              placeholder="TICKER"
            />
            {errors.ticker && <span>*required</span>}
          </label>

          <label className="form-control">
            <textarea
              className="textarea textarea-bordered h-[123px]"
              {...register("description")}
              placeholder="Description"
            ></textarea>
          </label>
        </div>
      </div>

      <MapboxPicker />

      <button
        onClick={() => handleSubmit(onSubmit)}
        className="absolute bottom-12 right-8 button-shadow px-4 py-2 text-2xl rounded-md bg-secondary text-secondary-content"
      >
        [submit]
      </button>
    </form>
  );
};
