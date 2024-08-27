"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonLoading } from "@/components/ui/loading-button";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const dummyData = [
  { name: "Olivia Martin", description: "This is olivia" },
  { name: "Jackson Lee", description: "This is Jackson Lee" },
  { name: "Adarsh Pandey", description: "This is Adarsh Pandey" },
  { name: "Gajendra Singh", description: "This is Gajendra Singh" },
  { name: "Chetan Singh", description: "This is Chetan Singh" },
  { name: "Olivia Martin", description: "This is olivia" },
  { name: "Jackson Lee", description: "This is Jackson Lee" },
  { name: "Adarsh Pandey", description: "This is Adarsh Pandey" },
  { name: "Gajendra Singh", description: "This is Gajendra Singh" },
  { name: "Chetan Singh", description: "This is Chetan Singh" },
  { name: "Chetan Singh", description: "This is Chetan Singh" },
  { name: "Olivia Martin", description: "This is olivia" },
  { name: "Jackson Lee", description: "This is Jackson Lee" },
  { name: "Adarsh Pandey", description: "This is Adarsh Pandey" },
  { name: "Gajendra Singh", description: "This is Gajendra Singh" },
  { name: "Chetan Singh", description: "This is Chetan Singh" },
];
function Vote() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isVoter, setIsVoter] = useState(
    JSON.parse(localStorage.getItem("permissions")!).every(
      (permission: string) => permission === "VOTE"
    )
  );
  const logout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    } finally {
      setLoading(true);
    }
  };
  // let isVoter =  JSON.parse(localStorage.getItem("permissions")!).every((permission: string) => permission === 'VOTER');
  console.log(isVoter);
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-16">
      <Link
        href="/dashboard"
        className="fixed top-8 right-8 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        Dashboard <ArrowRight className="h-4 w-4" />
      </Link>
      <Card className="min-w-[550px]">
        <CardHeader>
          <CardTitle>Candidates</CardTitle>
        </CardHeader>
        <CardContent
          className={`grid gap-y-8 gap-x-12 grid-cols-${Math.ceil(
            dummyData.length / 8
          )}`}
        >
          {dummyData.map((candidate, index) => (
            <div className={`flex items-center gap-4`} key={index}>
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="" alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {candidate.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {candidate.description}
                </p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto">
                Vote
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
      <ButtonLoading isLoading={loading} onClick={logout}>
        Logout
      </ButtonLoading>
    </main>
  );
}

export default Vote;
