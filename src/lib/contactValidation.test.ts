import { describe, expect, it } from "vitest";
import {
  MAX_LENGTHS,
  readFields,
  validate,
  type ContactFields,
} from "./contactValidation";

const valid: ContactFields = {
  name: "Rahul Sen",
  phone: "+91 98300 12345",
  email: "rahul@example.com",
  company: "",
  service: "letter-board",
  message: "Need a 10 ft LED letter board for my shop.",
};

describe("readFields", () => {
  it("trims string fields and defaults missing ones to empty", () => {
    expect(readFields({ name: "  Rahul  ", phone: "9830012345" })).toEqual({
      name: "Rahul",
      phone: "9830012345",
      email: "",
      company: "",
      service: "",
      message: "",
    });
  });

  it("treats null as missing", () => {
    expect(readFields({ email: null })?.email).toBe("");
  });

  it("ignores unknown keys", () => {
    expect(readFields({ ...valid, admin: true })).toEqual(valid);
  });

  it.each([
    ["null", null],
    ["a string", "name=Rahul"],
    ["a number", 42],
    ["an array", [valid]],
  ])("rejects a body that is %s", (_label, body) => {
    expect(readFields(body)).toBeNull();
  });

  it.each([
    ["a number", { ...valid, phone: 9830012345 }],
    ["an object", { ...valid, name: { $ne: "" } }],
    ["an array", { ...valid, message: ["a", "b"] }],
  ])("rejects a field that is %s", (_label, body) => {
    expect(readFields(body)).toBeNull();
  });
});

describe("validate", () => {
  it("accepts a valid submission", () => {
    expect(validate(valid)).toEqual({});
  });

  it("accepts a submission without the optional email and service", () => {
    expect(validate({ ...valid, email: "", service: "" })).toEqual({});
  });

  it("requires a name", () => {
    expect(validate({ ...valid, name: "" })).toHaveProperty("name");
  });

  it("requires a phone number", () => {
    expect(validate({ ...valid, phone: "" })).toHaveProperty("phone");
  });

  it("requires a message", () => {
    expect(validate({ ...valid, message: "" })).toHaveProperty("message");
  });

  it.each(["not-an-email", "a@b", "a b@example.com", "@example.com"])(
    "rejects the invalid email %s",
    (email) => {
      expect(validate({ ...valid, email })).toHaveProperty("email");
    },
  );

  it.each(["abc1234", "98300-ABCDE", "<script>", "123456"])(
    "rejects the invalid phone %s",
    (phone) => {
      expect(validate({ ...valid, phone })).toHaveProperty("phone");
    },
  );

  it("reports every invalid field at once", () => {
    const errors = validate({
      ...valid,
      name: "",
      phone: "",
      email: "bad",
      message: "",
    });
    expect(Object.keys(errors).sort()).toEqual([
      "email",
      "message",
      "name",
      "phone",
    ]);
  });

  describe("boundaries", () => {
    it("name: 2 characters is the minimum", () => {
      expect(validate({ ...valid, name: "A" })).toHaveProperty("name");
      expect(validate({ ...valid, name: "Al" })).toEqual({});
    });

    it("name: enforces the maximum length", () => {
      const max = "a".repeat(MAX_LENGTHS.name);
      expect(validate({ ...valid, name: max })).toEqual({});
      expect(validate({ ...valid, name: `${max}a` })).toHaveProperty("name");
    });

    it("phone: 7 to 20 characters", () => {
      expect(validate({ ...valid, phone: "1234567" })).toEqual({});
      expect(validate({ ...valid, phone: "1".repeat(20) })).toEqual({});
      expect(validate({ ...valid, phone: "1".repeat(21) })).toHaveProperty(
        "phone",
      );
    });

    it("message: 10 characters is the minimum", () => {
      expect(validate({ ...valid, message: "123456789" })).toHaveProperty(
        "message",
      );
      expect(validate({ ...valid, message: "1234567890" })).toEqual({});
    });

    it("message: enforces the maximum length", () => {
      const max = "a".repeat(MAX_LENGTHS.message);
      expect(validate({ ...valid, message: max })).toEqual({});
      expect(validate({ ...valid, message: `${max}a` })).toHaveProperty(
        "message",
      );
    });

    it("email: enforces the maximum length", () => {
      const email = `${"a".repeat(MAX_LENGTHS.email)}@example.com`;
      expect(validate({ ...valid, email })).toHaveProperty("email");
    });

    it("service: enforces the maximum length", () => {
      const service = "a".repeat(MAX_LENGTHS.service + 1);
      expect(validate({ ...valid, service })).toHaveProperty("service");
    });
  });

  it("measures lengths after readFields trims whitespace", () => {
    const fields = readFields({ ...valid, name: "   A   " });
    expect(fields).not.toBeNull();
    expect(validate(fields!)).toHaveProperty("name");
  });
});
