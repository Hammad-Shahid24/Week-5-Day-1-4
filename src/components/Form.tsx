import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface RegistrationFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  dateOfBirth: Date;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name cannot exceed 30 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  confirmPassword: Yup.string()
    .nullable() // Allows `null` values to prevent type errors
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),
});

const UserRegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<RegistrationFormValues> = (data) => {
    console.log("User Registration Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center rounded-lg justify-center bg-gradient-to-r from-blue-500 to-indigo-500 p-4 mt-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          User Registration
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Fill in the details below to create your account.
        </p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your name"
            {...register("name")}
          />
          <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
            {...register("email")}
          />
          <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your password"
            {...register("password")}
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.password?.message}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("gender")}
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <p className="text-red-500 text-xs mt-1">{errors.gender?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("dateOfBirth")}
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.dateOfBirth?.message}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-md px-4 py-2 hover:shadow-md transition duration-200 hover:from-blue-600 hover:to-indigo-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
