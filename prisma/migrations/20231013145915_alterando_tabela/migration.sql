/*
  Warnings:

  - Added the required column `cor` to the `disciplinas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "disciplinas" ADD COLUMN     "cor" CHAR(6) NOT NULL;
