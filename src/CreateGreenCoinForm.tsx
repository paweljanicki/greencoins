import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import MapboxPicker from "./MapboxPicker";
import { ImageDropzoneInput } from "./shared/components";
import { deployToken } from "./shared/helpers/deployToken";
import { CreateToken } from "./shared/types";
import { ReadableTx } from "./shared/components/ReadableTx";

export default () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateToken>();
  const onSubmit: SubmitHandler<CreateToken> = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    const transactionHash = await deployToken(data);
    setIsSubmitting(false);
    setTransactionHash(transactionHash);
  };

  if (transactionHash) {
    return (
      <div>
        <h1>Transaction Hash</h1>
        <p>
          <ReadableTx tx={transactionHash} />
        </p>
      </div>
    );
  }

  if (isSubmitting) {
    return <h1>Submitting...</h1>;
  }

  return (
    <form className="relative" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid md:grid-cols-[250px_1fr] gap-4 mb-4">
        <div className="order-2 md:order-1">
          <ImageDropzoneInput
            errors={errors}
            control={control}
            name="file"
            required={true}
          />
        </div>
        <div className="order-1 md:order-2">
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

      <MapboxPicker
        setValue={setValue}
        control={control}
        nameLat="lat"
        nameLng="lng"
      />
      <button
        onClick={() => handleSubmit(onSubmit)}
        className="absolute bottom-0 right-0 button-shadow px-4 py-2 text-2xl rounded-md bg-secondary text-secondary-content"
      >
        [submit]
      </button>
    </form>
  );
};
