import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import { useFavorites } from "../useFavorites";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

// Mock Firestore methods
vi.mock("firebase/firestore", () => ({
  getFirestore: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  arrayUnion: vi.fn(),
  arrayRemove: vi.fn(),
}));

describe("useFavorites", () => {
  const user = { uid: "user1" };

  it("should return favorites when user has them", async () => {
    const mockFavorites = ["US", "CA"];
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ countries: mockFavorites }),
    });

    const { result } = renderHook(() => useFavorites(user));

    const favorites = await result.current.getFavorites();

    expect(favorites).toEqual(mockFavorites);
    expect(getDoc).toHaveBeenCalledWith(
      doc(expect.anything(), "favorites", user.uid)
    );
  });

  it("should return an empty array when user has no favorites", async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => false,
      data: () => ({ countries: [] }),
    });

    const { result } = renderHook(() => useFavorites(user));

    const favorites = await result.current.getFavorites();

    expect(favorites).toEqual([]);
    expect(getDoc).toHaveBeenCalledWith(
      doc(expect.anything(), "favorites", user.uid)
    );
  });

  it("should add a favorite correctly", async () => {
    const code = "FR";
    const { result } = renderHook(() => useFavorites(user));

    await act(async () => {
      await result.current.addFavorite(code);
    });

    // Ensuring the correct document reference is used
    expect(setDoc).toHaveBeenCalledWith(
      doc(expect.anything(), "favorites", user.uid),
      {},
      { merge: true }
    );

    // Checking if arrayUnion is used correctly to add the favorite
    expect(updateDoc).toHaveBeenCalledWith(
      doc(expect.anything(), "favorites", user.uid),
      { countries: arrayUnion(code) }
    );
  });

  it("should remove a favorite correctly", async () => {
    const code = "FR";
    const { result } = renderHook(() => useFavorites(user));

    await act(async () => {
      await result.current.removeFavorite(code);
    });

    // Checking if arrayRemove is used correctly to remove the favorite
    expect(updateDoc).toHaveBeenCalledWith(
      doc(expect.anything(), "favorites", user.uid),
      { countries: arrayRemove(code) }
    );
  });
});
