// src/viewmodels/useContactViewModel.ts
import { useState } from "react";
import { sendContactMessage } from "../services/ContactUsService";

export const useContactViewModel = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    const setField = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const submit = async () => {
        const { name, email, number, message } = formData;

        if (!name || !email || !number || !message) {
            setStatusMessage("Të gjitha fushat janë të detyrueshme!");
            return false;
        }

        setLoading(true);
        setStatusMessage("");

        try {
            const res = await sendContactMessage(formData);
            setStatusMessage(res.message);
            setFormData({ name: "", email: "", number: "", message: "" });
            setLoading(false);
            return true;
        } catch (error) {
            setStatusMessage("Gabim gjatë dërgimit të formularit.");
            setLoading(false);
            return false;
        }
    };

    return {
        formData,
        loading,
        statusMessage,
        setField,
        submit,
    };
};
