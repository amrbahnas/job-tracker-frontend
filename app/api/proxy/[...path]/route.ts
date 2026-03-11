import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import axiosInstance from "@/api_config/apiServer"

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

export async function GET(request: NextRequest) {
  return handleRequest(request, "GET")
}

export async function POST(request: NextRequest) {
  return handleRequest(request, "POST")
}

export async function PUT(request: NextRequest) {
  return handleRequest(request, "PUT")
}

export async function PATCH(request: NextRequest) {
  return handleRequest(request, "PATCH")
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request, "DELETE")
}

async function handleRequest(request: NextRequest, method: RequestMethod) {
  const endpoint = request.url.split("proxy")[1]

  try {
    let requestData: any
    const contentType = request.headers.get("content-type")

    // Handle different content types
    if (contentType?.includes("multipart/form-data")) {
      requestData = await request.formData()
    } else if (contentType?.includes("application/json")) {
      requestData = await request.json().catch(() => ({}))
    }

    const config = {
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
    }

    let response

    switch (method) {
      case "GET":
        response = await axiosInstance.get(endpoint, config)
        break
      case "POST":
        response = await axiosInstance.post(endpoint, requestData, config)
        break
      case "PUT":
        response = await axiosInstance.put(endpoint, requestData, config)
        break
      case "PATCH":
        response = await axiosInstance.patch(endpoint, requestData, config)
        break
      case "DELETE":
        response = await axiosInstance.delete(endpoint, config)
        break
      default:
        throw new Error(`Unsupported method: ${method}`)
    }

    const newResponse = NextResponse.json(response.data)

    // Handle cookies
    const cookies = response.headers["set-cookie"]
    if (cookies) {
      cookies.forEach((cookie) => {
        newResponse.headers.append("Set-Cookie", cookie)
      })
    }

    return newResponse
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // If backend is not available
      if (
        error.code === "ECONNREFUSED" ||
        error.code === "ECONNRESET" ||
        error.code === "ETIMEDOUT"
      ) {
        return NextResponse.json(
          { error: "Backend service is temporarily unavailable" },
          { status: 503 }
        )
      }
      // Return the error from the backend if available
      return NextResponse.json(
        error.response?.data || "Failed to process request",
        { status: error.response?.status || 500 }
      )
    }
    return NextResponse.json("Internal server error", { status: 500 })
  }
}
