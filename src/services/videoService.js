import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://ifdmuifsabamwqqlxrmk.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZG11aWZzYWJhbXdxcWx4cm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMjI3MjksImV4cCI6MTk4Mzc5ODcyOX0.snv-PICaaoa2KJ9G6JPoTIrhp4C5yyT8S-94vHtIjkg"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllvideos() {
        return supabase.from("video")
                .select("*")
                
        }
    }
}