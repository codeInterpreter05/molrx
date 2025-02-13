"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import ComponentHeader from "@/components/ComponentHeader/ComponentHeader";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { createUser } from "@/lib/actions/user.actions";
import {
  LoaderCircle,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";

const SignUp: React.FC = () => {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    photo: "",
    userBio: "",
  });

  const [errors, setErrors] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value, // Ensure the value is treated as a string
    }));
  };

  // Validate form fields
  const validateForm = useCallback(() => {
    if (
      !user.email ||
      !user.firstName ||
      !user.lastName ||
      !user.password ||
      !user.confirmPassword
    ) {
      return "Please fill in all the fields.";
    }
    if (user.password !== user.confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  }, [user]);

  let isSubmitting = false;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    isSubmitting = true;

    setIsLoading(true);

    const formError = validateForm();
    if (formError) {
      setErrors(formError);
      setIsLoading(false);
      isSubmitting = false;
      return;
    }

    setErrors(null);

    try {

      const newUser = {
        ...user,
      };

      console.log(newUser);
      const createdUser = await createUser(newUser);
      console.log(createdUser);

      setUser({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        photo: "",
        userBio: "",
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error registering user:", error);
      setErrors("Registration failed.");
    } finally {
      isSubmitting = false;
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <ComponentHeader pageName="Sign Up" />

      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center" onSubmit={handleSubmit}>
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 inline-block" href="/">
                <div className="flex flex-row items-center justify-center space-x-2">
                  <div className="ml-3 rounded-lg bg-[#3c4fe0] p-1">
                    <Image
                      width={32}
                      height={32}
                      src={"/images/logo/dna.svg"}
                      alt="Logo"
                      priority
                    />
                  </div>
                  <p className="text-xl font-semibold text-black">
                    MolRx
                  </p>
                </div>
              </Link>

              <span className="mt-15 inline-block">
              
              </span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2"
            autoComplete="off"
          >
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to MolRx
              </h2>

              <div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <UserIcon />
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <UserIcon />
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      placeholder="Enter email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <MailIcon />
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInputChange}
                      placeholder="Enter password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <LockIcon />
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={user.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Re-enter password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <span className="absolute right-4 top-4">
                      <LockIcon />
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Bio
                  </label>
                  <div className="relative">
                    <textarea
                      name="bio"
                      value={user.userBio}
                      onChange={handleInputChange}
                      placeholder="Enter bio"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                {errors && <div className="mb-4 text-red">{errors}</div>}
                <div className="mb-5">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <LoaderCircle className="mr-2 animate-spin" /> Signing
                        Up...
                      </span>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{" "}
                    <Link href="/auth-page/signin" className="text-primary">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignUp;


