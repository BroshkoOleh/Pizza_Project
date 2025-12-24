"use client";

import React from "react";
import { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: Props) {
  const { id } = use(params);
  return <div className="text-3xl font-bold underline">product {id}</div>;
}
