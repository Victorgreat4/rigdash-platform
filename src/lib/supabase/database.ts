export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      countries: {
        Row: {
          created_at: string;
          id: string;
          iso_alpha2: string | null;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          iso_alpha2?: string | null;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          iso_alpha2?: string | null;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      manufacturers: {
        Row: {
          country_id: string | null;
          created_at: string;
          id: string;
          name: string;
          slug: string;
          website: string | null;
        };
        Insert: {
          country_id?: string | null;
          created_at?: string;
          id?: string;
          name: string;
          slug: string;
          website?: string | null;
        };
        Update: {
          country_id?: string | null;
          created_at?: string;
          id?: string;
          name?: string;
          slug?: string;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "manufacturers_country_id_fkey";
            columns: ["country_id"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["id"];
          }
        ];
      };
      cartridges: {
        Row: {
          caliber: string;
          cartridge_type: string;
          casing_material: string | null;
          country_id: string | null;
          created_at: string;
          id: string;
          manufacturer_id: string | null;
          name: string;
          notes: string | null;
          slug: string;
        };
        Insert: {
          caliber: string;
          cartridge_type: string;
          casing_material?: string | null;
          country_id?: string | null;
          created_at?: string;
          id?: string;
          manufacturer_id?: string | null;
          name: string;
          notes?: string | null;
          slug: string;
        };
        Update: {
          caliber?: string;
          cartridge_type?: string;
          casing_material?: string | null;
          country_id?: string | null;
          created_at?: string;
          id?: string;
          manufacturer_id?: string | null;
          name?: string;
          notes?: string | null;
          slug?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cartridges_country_id_fkey";
            columns: ["country_id"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cartridges_manufacturer_id_fkey";
            columns: ["manufacturer_id"];
            isOneToOne: false;
            referencedRelation: "manufacturers";
            referencedColumns: ["id"];
          }
        ];
      };
      weapons: {
        Row: {
          action_type: string | null;
          barrel_length_mm: number | null;
          country_id: string | null;
          created_at: string;
          id: string;
          manufacturer_id: string | null;
          name: string;
          notes: string | null;
          platform: string | null;
          slug: string;
          weapon_type: string;
        };
        Insert: {
          action_type?: string | null;
          barrel_length_mm?: number | null;
          country_id?: string | null;
          created_at?: string;
          id?: string;
          manufacturer_id?: string | null;
          name: string;
          notes?: string | null;
          platform?: string | null;
          slug: string;
          weapon_type: string;
        };
        Update: {
          action_type?: string | null;
          barrel_length_mm?: number | null;
          country_id?: string | null;
          created_at?: string;
          id?: string;
          manufacturer_id?: string | null;
          name?: string;
          notes?: string | null;
          platform?: string | null;
          slug?: string;
          weapon_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "weapons_country_id_fkey";
            columns: ["country_id"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "weapons_manufacturer_id_fkey";
            columns: ["manufacturer_id"];
            isOneToOne: false;
            referencedRelation: "manufacturers";
            referencedColumns: ["id"];
          }
        ];
      };
      weapon_cartridge_compatibility: {
        Row: {
          cartridge_id: string;
          compatibility_type: string;
          created_at: string;
          id: string;
          notes: string | null;
          weapon_id: string;
        };
        Insert: {
          cartridge_id: string;
          compatibility_type?: string;
          created_at?: string;
          id?: string;
          notes?: string | null;
          weapon_id: string;
        };
        Update: {
          cartridge_id?: string;
          compatibility_type?: string;
          created_at?: string;
          id?: string;
          notes?: string | null;
          weapon_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "weapon_cartridge_compatibility_cartridge_id_fkey";
            columns: ["cartridge_id"];
            isOneToOne: false;
            referencedRelation: "cartridges";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "weapon_cartridge_compatibility_weapon_id_fkey";
            columns: ["weapon_id"];
            isOneToOne: false;
            referencedRelation: "weapons";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
