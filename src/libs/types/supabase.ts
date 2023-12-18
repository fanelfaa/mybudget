export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			budgets: {
				Row: {
					amount: number;
					created_at: string | null;
					expenses: number;
					id: string;
					month: number | null;
					name: string;
					room_id: string;
					year: number | null;
				};
				Insert: {
					amount?: number;
					created_at?: string | null;
					expenses?: number;
					id?: string;
					month?: number | null;
					name: string;
					room_id: string;
					year?: number | null;
				};
				Update: {
					amount?: number;
					created_at?: string | null;
					expenses?: number;
					id?: string;
					month?: number | null;
					name?: string;
					room_id?: string;
					year?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "budgets_room_id_fkey";
						columns: ["room_id"];
						referencedRelation: "rooms";
						referencedColumns: ["id"];
					},
				];
			};
			categories: {
				Row: {
					created_at: string | null;
					id: string;
					is_income: boolean;
					name: string;
					room_id: string;
				};
				Insert: {
					created_at?: string | null;
					id?: string;
					is_income?: boolean;
					name: string;
					room_id: string;
				};
				Update: {
					created_at?: string | null;
					id?: string;
					is_income?: boolean;
					name?: string;
					room_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "categories_room_id_fkey";
						columns: ["room_id"];
						referencedRelation: "rooms";
						referencedColumns: ["id"];
					},
				];
			};
			rooms: {
				Row: {
					created_at: string | null;
					id: string;
					name: string;
				};
				Insert: {
					created_at?: string | null;
					id?: string;
					name: string;
				};
				Update: {
					created_at?: string | null;
					id?: string;
					name?: string;
				};
				Relationships: [];
			};
			transactions: {
				Row: {
					amount: number;
					budget_id: string | null;
					category_id: string | null;
					created_at: string | null;
					date: number;
					id: string;
					is_income: boolean;
					month: number;
					note: string;
					room_id: string;
					year: number;
				};
				Insert: {
					amount?: number;
					budget_id?: string | null;
					category_id?: string | null;
					created_at?: string | null;
					date: number;
					id?: string;
					is_income?: boolean;
					month: number;
					note?: string;
					room_id: string;
					year: number;
				};
				Update: {
					amount?: number;
					budget_id?: string | null;
					category_id?: string | null;
					created_at?: string | null;
					date?: number;
					id?: string;
					is_income?: boolean;
					month?: number;
					note?: string;
					room_id?: string;
					year?: number;
				};
				Relationships: [
					{
						foreignKeyName: "transactions_budget_id_fkey";
						columns: ["budget_id"];
						referencedRelation: "budgets";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "transactions_category_id_fkey";
						columns: ["category_id"];
						referencedRelation: "categories";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "transactions_room_id_fkey";
						columns: ["room_id"];
						referencedRelation: "rooms";
						referencedColumns: ["id"];
					},
				];
			};
			user_room: {
				Row: {
					created_at: string | null;
					id: number;
					room_id: string;
					user_id: string;
				};
				Insert: {
					created_at?: string | null;
					id?: number;
					room_id: string;
					user_id: string;
				};
				Update: {
					created_at?: string | null;
					id?: number;
					room_id?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "user_room_room_id_fkey";
						columns: ["room_id"];
						referencedRelation: "rooms";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "user_room_user_id_fkey";
						columns: ["user_id"];
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
